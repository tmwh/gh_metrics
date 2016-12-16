class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.integer :github_id
      t.string :label_name
      t.string :label_color
      t.string :actor
      t.string :created

      t.timestamps
    end
  end
end
