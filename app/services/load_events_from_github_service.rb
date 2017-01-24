# frozen_string_literal: true
class LoadEventsFromGithubService
  LABELED_EVENT = 'labeled'
  EVENTS_PER_PAGE = 100
  DEFAULT_SINCE_VALUE = 6.months.ago.iso8601

  def initialize(token, user)
    @token = token
    @user = user
  end

  def perform
    all_issues_for_needed_period.each do |issue|
      github.issues.events.list(
        issue_number: issue[:number],
        user: issue[:user],
        repo: issue[:repo]
      ).each do |event|
        if add_new_event?(event)
          Event.create!(
            github_id: event.id, label_name: event.label.name, label_color: event.label.color,
            actor: event.actor.login, created: Date.parse(event.created_at), repo: issue[:repo]
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

  def all_issues_for_needed_period
    all_owners_and_repos_array.reduce([]) do |array, owner_repo_array|
      array << github.issues.list(
        user: owner_repo_array.first,
        repo: owner_repo_array.last,
        since: since_issues_value,
        per_page: EVENTS_PER_PAGE
      ).reduce([]) do |arr, issue|
        arr << { user: owner_repo_array.first, repo: owner_repo_array.last, number: issue.number }
      end
    end.flatten.compact
  end

  def since_issues_value
    Event.any? ? last_event_formatted_created_date : DEFAULT_SINCE_VALUE
  end

  def last_event_formatted_created_date
    (Date.today - Event.order(:created).last.created).to_i.days.ago.iso8601
  end

  def github
    @_github ||= Github.new oauth_token: @token, auto_pagination: true
  end
end
