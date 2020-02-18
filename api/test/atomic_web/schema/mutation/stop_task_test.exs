defmodule AtomicWeb.Schema.Mutation.StopTaskTest do
  use AtomicWeb.ConnCase, async: true

  setup do
    {:ok, user} = create_user()
    {:ok, project} = create_project(%{user: user})
    {:ok, task} = create_task(%{user: user, project: project})

    {:ok, user: user, task: task}
  end

  @query """
  mutation ($taskId: ID!) {
    stopTask(taskId: $taskId) {
      timerStatus
    }
  }
  """

  test "stopTask changes the timer status to stopped", %{user: user, task: task} do
    conn = build_conn()
    |> auth_user(user)
    |> post("/graphql", query: @query, variables: %{"taskId" => Integer.to_string(task.id)})

    assert json_response(conn, 200) === %{
      "data" => %{
        "stopTask" => %{
          "timerStatus" => "stopped",
        }
      }
    }
  end
end

