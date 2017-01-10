# frozen_string_literal: true
class LoadEventsFromGithubService
  LABELED_EVENT = 'labeled'
  SINCE_DAYS_VALUE = 7.days.ago.iso8601
  EVENTS_PER_PAGE = 100

  def initialize(token, user)
    @token = token
    @user = user
  end

  def perform
    all_owners_and_repos_array.each do |owner_repo_array|
      github.issues.events.list(
        user: owner_repo_array.first,
        repo: owner_repo_array.last,
        per_page: EVENTS_PER_PAGE,
        since: SINCE_DAYS_VALUE
      ).each do |event|
        if add_new_event?(event)
          Event.create!(
            github_id: event.id, label_name: event.label.name, label_color: event.label.color,
            actor: event.actor.login, created: Date.parse(event.created_at), repo: owner_repo_array.last
          )
        end
      end
    end
  end

  private

  def all_owners_and_repos_array
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
