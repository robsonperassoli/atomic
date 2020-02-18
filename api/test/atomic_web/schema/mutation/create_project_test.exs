defmodule AtomicWeb.Schema.Mutation.CreateProjectTest do
  use AtomicWeb.ConnCase, async: true

  @query """
  mutation ($name: String!) {
    createProject(name: $name) {
      name
    }
  }
  """

  test "createProject creates a project" do
    {:ok, user} = create_user()

    project_name = "New project - Test"

    conn = build_conn()
    |> auth_user(user)
    |> post("/graphql", query: @query, variables: %{name: project_name})

    assert json_response(conn, 200) === %{
      "data" => %{
        "createProject" => %{
          "name" => project_name,
        }
      }
    }
  end
end

