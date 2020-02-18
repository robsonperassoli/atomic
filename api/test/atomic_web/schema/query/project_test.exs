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

  test "only the owner can query a project" do
    project_name = "Atomic development"
    {:ok, owner} = create_user()
    {:ok, other_user} = create_user()
    {:ok, project} = create_project(%{name: project_name}, owner)

    conn = build_conn()
    |> auth_user(other_user)
    |> get("/graphql", query: @query, variables: %{"id" => project.id})

    assert json_response(conn, 200) === %{
      "data" => %{
        "project" => nil},
        "errors" => [
          %{
            "locations" => [
              %{"column" => 0, "line" => 2}
            ],
            "message" => "Project not found",
            "path" => ["project"]
          }
        ]
    }
  end
end
