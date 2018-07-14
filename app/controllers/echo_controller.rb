class EchoController < ApplicationController
  def process
    Ralyxa::Skill.handle(request)
  end
end
