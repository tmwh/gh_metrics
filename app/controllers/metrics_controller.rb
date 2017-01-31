class MetricsController < ApplicationController
  before_action :check_user_login
  LOAD_EVENTS_DATE_RANGE = Array(Date.today - 6..Date.today)

  def index
    @repositories = load_repositories
    @grouped_events_carrier = GroupedEventsCarrier.new(load_events)
    @labels = LabelsCarrier.new(load_events)
  end
end
