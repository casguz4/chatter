dev: 
	make -j2 dev-dotnet dev-node
dev-dotnet:
	dotnet watch

dev-node:
	pnpm run build:watch

build:
	pnpm run build && dotnet publish

build-ci:
	pnpm run ci && dotnet publish SignalRWebpack.sln
	