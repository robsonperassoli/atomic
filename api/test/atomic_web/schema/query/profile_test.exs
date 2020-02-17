defmodule AtomicWeb.Schema.Query.ProfileTest do
  use AtomicWeb.ConnCase, async: true
  alias Atomic.Accounts
  alias Atomic.Guardian

  setup do
    Atomic.Seeds.run()
  end

  @query """
  {
    me {
      email
      name
    }
  }
  """

  def get_token() do
    {:ok, token, _} = Accounts.get_user_by_email("robsonme@mydomain.com")
    |> Guardian.encode_and_sign

    token
  end

  test "me returns user profile" do
    conn = build_conn()
    |> put_req_header("authorization", "Bearer #{get_token()}")
    |> get("/graphql", query: @query)

    assert json_response(conn, 200) === %{
      "data" => %{
        "me" => %{
          "name" => "Robson",
          "email" => "robsonme@mydomain.com"
        }
      }
    }
  end
end
