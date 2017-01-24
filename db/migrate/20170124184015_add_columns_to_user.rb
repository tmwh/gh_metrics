class AddColumnsToUser < ActiveRecord::Migration[5.0]
  def change
    change_table :users do |t|
      t.integer :github_id
      t.string :avatar_url
      t.rename :github_name, :name
    end
  end
end
