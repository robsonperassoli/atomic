defmodule AtomicWeb.Schema.Query.ProjectTest do
  use AtomicWeb.ConnCase, async: true
  use Timex

  @query """
  query ProjectQuery($id: ID!){
    project(id: $id) {
      name
    }
  }
  """

  test "project by id returns the correct project" do
    {:ok, user} = create_user()
    {:ok, project} = create_project(%{user: user})

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
    {:ok, project} = create_project(%{name: project_name, user: owner})

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

  @query """
  query ProjectQuery($id: ID!, $createdAtStart: DateTime!, $createdAtEnd: DateTime!){
    project(id: $id) {
      name
      tasks(createdAtStart: $createdAtStart, createdAtEnd: $createdAtEnd) {
        id
        description
      }
    }
  }
  """

  test "project returns only its own tasks" do
    {:ok, owner} = create_user()
    {:ok, project_one} = create_project(%{user: owner})
    {:ok, task_one} = create_task(%{user: owner, project: project_one})

    {:ok, other_user} = create_user()
    {:ok, project_two} = create_project(%{user: other_user})
    {:ok, _task_two} = create_task(%{user: other_user, project: project_two})


    created_at_start = Timex.now |> Timex.shift(hours: -2) |> Timex.format!("{ISO:Extended}")
    created_at_end = Timex.now |> Timex.shift(hours: 2) |> Timex.format!("{ISO:Extended}")

    variables = %{
      "id" => project_one.id,
      "createdAtStart" => created_at_start,
      "createdAtEnd" => created_at_end
    }

    conn = build_conn()
    |> auth_user(owner)
    |> get("/graphql", query: @query, variables: variables)

    assert json_response(conn, 200) === %{
      "data" => %{
        "project" => %{
          "name" => project_one.name,
          "tasks" => [
            %{
              "description" => task_one.description,
              "id" => Integer.to_string(task_one.id)
            }
          ]
        }
      }
    }
  end
end
