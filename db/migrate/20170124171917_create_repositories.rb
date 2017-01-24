class CreateRepositories < ActiveRecord::Migration[5.0]
  def change
    create_table :repositories do |t|
      t.bigint :github_id
      t.string :name

      t.timestamps

      t.index :github_id
    end
  end
end
