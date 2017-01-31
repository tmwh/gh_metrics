class Api::V1::MetricxController < Api::V1::BaseController
  def index
    respond_with @labels = LabelsCarrier.new(load_events)
  end
end
