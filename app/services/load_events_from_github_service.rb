# frozen_string_literal: true
class LoadEventsFromGithubService
  LABELED_EVENT = 'labeled'

  def initialize(token, user, repo)
    @token = token
    @user = user
    @repo = repo
  end

  def perform
    get_all_events.each do |event|
      if add_new_event?(event)
        Event.create!(
          github_id: event.id, label_name: event.label.name, label_color: event.label.color,
          actor: event.actor.login, created: event.created_at
        )
      end
    end
  end

  private

  def add_new_event?(event)
    event.event == LABELED_EVENT && Event.find_by(github_id: event.id).nil?
  end

  def get_all_events
    github.issues.events.list(user: @user, repo: @repo)
  end

  def github
    @_github ||= Github.new oauth_token: @token
  end
end
