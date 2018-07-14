class SnapshotBuilder
  attr_reader :file

  def initialize(file)
    @file = file
    @s3 = init_s3
  end

  def create_snapshot_record
    url = upload_to_s3
    ap url
    url
  end

  def upload_to_s3
    key = "snap-#{Time.now.to_i}.jpg"
    obj = @s3.bucket(ENV['AWS_BUCKET']).object(key)
    obj.upload_file(file.path, acl: 'public-read')
    obj.public_url
  end

  private

  def init_s3
    Aws::S3::Resource.new(region:'us-east-1')
  end
end