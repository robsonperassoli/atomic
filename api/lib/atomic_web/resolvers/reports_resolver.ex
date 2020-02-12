defmodule AtomicWeb.ReportsResolver do

  def request_tasks_report(_root, args, %{context: %{current_user: user}}) do
    event = args
    |> Map.put_new(:user_id, user.id)
    |> Map.put_new(:type, :report)

    AtomicWeb.EventBus.broadcast(event)

    {:ok, true}
  end
end
