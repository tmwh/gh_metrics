class MetricsController < ApplicationController
  before_action :check_user_login
  rescue_from Github::Error::NotFound || Github::Error::Unauthorized, with: :redirect_to_login

  LOAD_EVENTS_DATE_RANGE = Array(Date.today - 7..Date.today)

  def index
    @repositories = load_repositories
    @grouped_events_carrier = GroupedEventsCarrier.new(load_events)
    @labels = LabelsCarrier.new(load_events)
  end

  private

  def load_repositories
    Github.new(oauth_token: session[:token]).repos.list.map(&:name)
  end

  def load_events
    if params[:repository].present?
      Event.where(repo: params[:repository], created: LOAD_EVENTS_DATE_RANGE)
    else
      Event.where(repo: load_repositories.first, created: LOAD_EVENTS_DATE_RANGE)
    end
  end
end
