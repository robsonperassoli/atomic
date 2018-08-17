# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Atomic.Repo.insert!(%Atomic.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Atomic.Accounts.User
alias Atomic.ProjectManagement.Project
alias Atomic.Repo

%User{name: "Robson", email: "robsonme@mydomain.com"}
|> Repo.insert!

%User{name: "Blast User", email: "blast@ownuser.com"}
|> Repo.insert!

%Project{name: "Atomic Development"}
|> Repo.insert!
