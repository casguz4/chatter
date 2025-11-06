dev: 
	make -j2 dev-dotnet dev-node
dev-dotnet:
	dotnet watch

dev-node:
	cd Client && pnpm run build:watch