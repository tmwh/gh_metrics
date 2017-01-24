class CreateRepositoriesUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :repositories_users do |t|
      t.references :repository, foreign_key: true, on_delete: :cascade
      t.references :user, foreign_key: true, on_delete: :cascade
    end
  end
end
