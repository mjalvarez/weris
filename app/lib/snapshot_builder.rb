class SnapshotBuilder
  attr_reader :file

  def initialize(file)
    @file = file
    @s3 = init_s3
  end

  def create_snapshot_record
    public_url = upload_to_s3
    Snapshot.create photo: file, public_url: public_url

  end

  def upload_to_s3
    key = "snap-#{Time.now.to_i}.jpg"
    obj = @s3.bucket('remote-finder').object(key)
    obj.upload_file(file.path, acl: 'public-read')
    obj.public_url
  end

  private

  def init_s3
    Aws::S3::Resource.new(region:'us-east-1')
  end
end