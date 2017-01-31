class LabelsCarrier
  LABEL_STATUS = %w(backlog ready progress verify codereview).freeze

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

  def labels_name_list
    uniq_labels.map { |l| l[:name] }
  end
end
