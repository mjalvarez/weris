class SnapshotsController < ApplicationController
  def index

  end

  def create
    builder = SnapshotBuilder.new(captured_image)
    builder.create_snapshot_record
    head :ok
  end

  def weris
    @snapshots = Snapshot.all
  end

  private

  def captured_image
    file = Tempfile.new(['temp','.jpg'])
    file.binmode
    file.write request.body.read
    file
  end
end
