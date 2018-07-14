class CreateSnapshots < ActiveRecord::Migration[5.1]
  def change
    create_table :snapshots do |t|
      t.string :label
      t.attachment :photo
      t.timestamps
    end
  end
end
