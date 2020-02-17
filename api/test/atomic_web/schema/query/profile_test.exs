defmodule AtomicWeb.Schema.Query.ProfileTest do
  use AtomicWeb.ConnCase, async: true

  @query """
  {
    me {
      email
      name
    }
  }
  """

  test "me returns user profile" do
    {:ok, user} = create_user()

    conn = build_conn()
    |> auth_user(user)
    |> get("/graphql", query: @query)

    assert json_response(conn, 200) === %{
      "data" => %{
        "me" => %{
          "name" => user.name,
          "email" => user.email
        }
      }
    }
  end
end
