defmodule AtomicWeb.Schema.Query.ProjectsTest do
  use AtomicWeb.ConnCase, async: true

  @query """
  {
    projects {
      name
    }
  }
  """

  test "projects field return all user projects" do
    {:ok, user} = create_user()
    {:ok, project_one} = create_project(%{user: user, name: "Project 1"})
    {:ok, project_two} = create_project(%{user: user, name: "Project 2"})
    {:ok, project_three} = create_project(%{user: user, name: "Project 3"})
    {:ok, project_four} = create_project(%{user: user, name: "Project 4"})

    conn = build_conn()
    |> auth_user(user)
    |> get("/graphql", query: @query)

    assert json_response(conn, 200) === %{
      "data" => %{
        "projects" => [
          %{"name" => project_one.name},
          %{"name" => project_two.name},
          %{"name" => project_three.name},
          %{"name" => project_four.name}
        ]
      }
    }
  end
end
