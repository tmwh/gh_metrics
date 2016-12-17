class ChangeCreatedColumnTypeForEventsTable < ActiveRecord::Migration[5.0]
  def change
    change_column(:events, :created, 'date USING CAST(created AS date)')
  end
end
