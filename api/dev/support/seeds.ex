defmodule Atomic.Seeds do

  alias Atomic.Accounts
  alias Atomic.ProjectManagement
  alias Atomic.Repo

  def run do
    {:ok, _user} = Accounts.create_user(%{name: "Robson", email: "robsonme@mydomain.com", password: "123456"})

    :ok
  end

end
