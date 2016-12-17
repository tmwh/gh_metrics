class AddRepoColumnToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :repo, :string
  end
end
