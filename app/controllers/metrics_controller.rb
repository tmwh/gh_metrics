class MetricsController < ApplicationController
  before_action :check_user_login
  rescue_from Github::Error::NotFound || Github::Error::Unauthorized, with: :redirect_to_login

  def index
    @repositories = load_repositories
    @events = GroupedEventsCarrier.new(load_events).collection
    @labels = LabelsCarrier.new(load_events)
  end

  private

  def load_repositories
    Github.new(oauth_token: session[:token]).repos.list.map(&:name)
  end

  def load_events
    if params[:repository].present?
      Event.where(repo: params[:repository])
    else
      Event.where(repo: load_repositories.first)
    end
  end
end
