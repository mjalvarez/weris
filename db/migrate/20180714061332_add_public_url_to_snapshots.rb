class AddPublicUrlToSnapshots < ActiveRecord::Migration[5.1]
  def change
    add_column :snapshots, :public_url, :string
  end
end
