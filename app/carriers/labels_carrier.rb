class LabelsCarrier
  attr_reader :label_status

  LABEL_STATUS = %w(backlog ready progress verify codereview)

  def initialize(events)
    @events = events
    @label_status = LABEL_STATUS
  end

  def uniq_labels
    if @events.present?
      @events.reduce([]) do |arr, event|
        arr << { name: event.label_name, color: event.label_color }
      end.uniq
    end
  end

  def labels_name_list
    uniq_labels.map{|l| l[:name]}
  end
end
