defmodule AtomicWeb.Schema.Mutation.LoginTest do
  use AtomicWeb.ConnCase, async: true

  @query """
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
  """

  test "login returns a valid token" do
    name = "Robson"
    email = "robson.test.login@test.com"
    password = "123456"

    {:ok, user} = create_user(%{name: name, password: password, email: email})

    variables = %{
      email: email,
      password: password
    }

    response = build_conn()
    |> post("/graphql", query: @query, variables: variables)
    |> json_response(200)

    %{
      "data" => %{
        "login" => %{
          "token" => new_token
        }
      }
    } = response

    {:ok, claims} = Atomic.Guardian.decode_and_verify(new_token)

    assert String.to_integer(claims["sub"]) === user.id
  end
end

