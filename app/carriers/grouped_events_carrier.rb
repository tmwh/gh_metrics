# frozen_string_literal: true
class GroupedEventsCarrier
  WEEK = 7

  LABELS = {
    IN_PROGRESS: 'Status: In Progress',
    CODE_REVIEW: 'Status: Code Review',
    TO_VERIFY: 'Status: To Verify'
  }

  attr_reader :events

  def initialize(events)
    @events = events
  end

  def collection
    WEEK.times.reduce([]) do |arr, index|
      if (0..6).include? index
        nested_arr = []
        nested_arr << events.where(created: [Date.today - index], label_name: LABELS[:IN_PROGRESS]).count
        nested_arr << events.where(created: [Date.today - index], label_name: LABELS[:CODE_REVIEW]).count
        nested_arr << events.where(created: [Date.today - index], label_name: LABELS[:TO_VERIFY]).count
        arr << nested_arr
      end
    end
  end
end
