class LabelsCarrier
  def initialize(events)
    @events = events
  end

  def uniq_labels
    if @events.present?
      @events.reduce([]) do |arr, event|
        arr << { name: event.label_name, color: event.label_color }
      end.uniq
    end
  end
end
