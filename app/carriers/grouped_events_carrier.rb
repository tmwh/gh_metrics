class GroupedEventsCarrier
  WEEK = 7
  attr_reader :events

  def initialize(events)
    @events = events
  end

  def collection
    events.reduce([]) do |arr, event|
      if event_in_last_week_range?(event)
        arr <<
      end
    end
  end

  private

  def event_day_from_now(event)
    (Date.today - Date.parse(event.created)).to_i
  end

  def event_in_last_week_range?(event)
    event_day_from_now <= WEEK
  end
end
