defmodule Atomic.TestHelper do
  use Phoenix.ConnTest
  alias Atomic.Guardian

  def auth_user(conn, user) do
    {:ok, token, _} = Guardian.encode_and_sign(user)

    put_req_header(conn, "authorization", "Bearer #{token}")
  end
end
