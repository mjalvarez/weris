class Snapshot
  include Dynamoid::Document

  table name: :snapshots, key: :id

  field :s3_url, :string
end
