# frozen_string_literal: true
class LoadEventsFromGithubService
  LABELED_EVENT = 'labeled'

  def initialize(token, user)
    @token = token
    @user = user
  end

  def perform
    all_repos_hash.each do |repo_array|
      github.issues.events.list(user: repo_array.first, repo: repo_array.last, per_page: 100, since: 7.days.ago.iso8601).each do |event|
        if add_new_event?(event)
          Event.create!(
            github_id: event.id, label_name: event.label.name, label_color: event.label.color,
            actor: event.actor.login, created: Date.parse(event.created_at), repo: repo_array.last
          )
        end
      end
    end
  end

  private

  def all_repos_hash
    github.repos.list.reduce([]) do |arr, repo|
      arr << [repo.owner.login, repo.name]
    end
  end

  def add_new_event?(event)
    event.event == LABELED_EVENT && Event.find_by(github_id: event.id).nil?
  end

  def github
    @_github ||= Github.new oauth_token: @token
  end
end
