class MetricsController < ApplicationController
  before_action :check_user_login

  def index
    @repositories = load_repositories
    @grouped_events_carrier = GroupedEventsCarrier.new(load_events, params[:date_range])
    @labels = LabelsCarrier.new(load_events)
  end
end
