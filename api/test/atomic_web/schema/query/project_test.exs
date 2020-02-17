defmodule AtomicWeb.Schema.Query.ProjectTest do
  use AtomicWeb.ConnCase, async: true

  @query """
  query ProjectQuery($id: ID!){
    project(id: $id) {
      name
    }
  }
  """

  test "project by id returns the correct project" do
    {:ok, user} = create_user()
    {:ok, project} = create_project(user)

    conn = build_conn()
    |> auth_user(user)
    |> get("/graphql", query: @query, variables: %{"id" => project.id})

    assert json_response(conn, 200) === %{
      "data" => %{
        "project" => %{
          "name" => project.name,
        }
      }
    }
  end
end
