# frozen_string_literal: true
class GroupedEventsCarrier
  WEEK = 7

  attr_reader :events

  def initialize(events)
    @events = events
  end

  def collection
    uniq_labels.reduce([]) do |array, label|
      events_per_day = []
      WEEK.times.each do |index|
        events_per_day << events.where(created: [Date.today - index], label_name: label).count
      end
      array << cumulate!(events_per_day.reverse)
    end
  end

  def label_colors
    uniq_labels.reduce([]) do |array, label|
      array << events.find_by_label_name(label).label_color
    end
  end

  def days_of_week
    WEEK.times.reduce([]) do |array, index|
      array << (Date.today - index).strftime('%a')
    end.reverse
  end

  private

  def cumulate!(array)
    sum = 0
    array.map{ |x| sum += x }
  end

  def uniq_labels
    events.map(&:label_name).uniq
  end
end
