class MetricsController < ApplicationController
  before_action :check_user_login
  rescue_from Github::Error::NotFound || Github::Error::Unauthorized, with: :redirect_to_login

  def index
    @repositories = load_repositories
    @events = GroupedEventsCarrier.new(load_events).collection
    @labels = LabelsCarrier.new(load_events)
  end

  def load_repositories
    @repositories = Github.new(oauth_token: session[:token]).repos.list.reduce([]) do |arr, repo|
      arr << repo.name
    end
  end

  def load_events
    if params[:repository].present?
      Event.where(repo: params[:repository])
    else
      Event.where(repo: load_repositories.first)
    end
  end
end
