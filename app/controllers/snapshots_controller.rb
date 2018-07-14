class SnapshotsController < ApplicationController
  def index

  end

  def create
    Snapshot.create photo: request.body, label: Time.now.to_i
    head :ok
  end
end
