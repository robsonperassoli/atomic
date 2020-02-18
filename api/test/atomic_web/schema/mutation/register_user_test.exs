defmodule AtomicWeb.Schema.Mutation.RegisterUserTest do
  use AtomicWeb.ConnCase, async: true

  @query """
  mutation ($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
  """

  test "registerUser creates a user" do
    name = "Robson"
    email = "robson.atomic@test.com"
    password = "123456"

    variables = %{
      "name" => name,
      "email" => email,
      "password" => password
    }

    conn = build_conn()
    |> post("/graphql", query: @query, variables: variables)

    assert json_response(conn, 200) === %{
      "data" => %{
        "registerUser" => %{
          "name" => name,
          "email" => email,
        }
      }
    }
  end

  test "registerUser does not allow duplicated emails" do
    name = "Robson"
    email = "robson.atomic@test.com"
    password = "123456"

    user_data = %{
      name: name,
      email: email,
      password: password
    }

    {:ok, _user} = create_user(user_data)

    conn = build_conn()
    |> post("/graphql", query: @query, variables: user_data)

    assert json_response(conn, 200) ===  %{
      "data" => %{"registerUser" => nil},
      "errors" => [
        %{
          "details" => %{"email" => ["has already been taken"]},
          "locations" => [%{"column" => 0, "line" => 2}],
          "message" => "Error registering user",
          "path" => ["registerUser"]
        }
      ]
    }
  end
end

