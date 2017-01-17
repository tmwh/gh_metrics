class MetricsController < ApplicationController
  before_action :check_user_login
  rescue_from Github::Error::NotFound || Github::Error::Unauthorized, with: :redirect_to_login

  def index
    @repositories = load_repositories
    @grouped_events_carrier = GroupedEventsCarrier.new(load_events)
    @labels = LabelsCarrier.new(load_events)
  end
end
