# frozen_string_literal: true
class GroupedEventsCarrier
  WEEK = 7

  attr_reader :events

  def initialize(events)
    @events = events
  end

  def collection
    WEEK.times.reduce([]) do |arr, index|
      if (0..6).include? index
        nested_arr = []
        nested_arr << events.where(created: [Date.today - index], label_name: 'Status: In Progress').count
        nested_arr << events.where(created: [Date.today - index], label_name: 'Status: Code Review').count
        nested_arr << events.where(created: [Date.today - index], label_name: 'Status: To Verify').count
        arr << nested_arr
      end
    end
  end
end
