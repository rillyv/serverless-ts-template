serverless-yml-setup:
	rm -f serverless.yml
	op inject -i serverless.yml.tpl -o serverless.yml

transpile:
	npm run build

setup:
	npm install && \
	make serverless-yml-setup && \
	make transpile

aws-configure:
	@echo "\033[0;32m***************************************************************\033[0m"
		@echo "\033[0;32m****                                                       ****\033[0m"
		@echo "\033[0;32m****      \033[0mPlease provide the correct AWS credentials.\033[0;32m      ****\033[0m"
		@echo "\033[0;32m****                                                       ****\033[0m"
		@echo "\033[0;32m***************************************************************\033[0m"
	aws configure

serverless-offline:
	make setup && \
	npx serverless offline start --noTimeout --reloadHandler --corsDisallowCredentials --stage develop

serverless-deploy-develop:
	make aws-configure && \
	make setup && \
	npx serverless deploy --stage develop

serverless-deploy-staging:
	make aws-configure && \
	make setup && \
	npx serverless deploy --stage staging

serverless-deploy-production:
	make aws-configure && \
	make setup && \
	npx serverless deploy --stage production

serverless-deploy-all:
	make aws-configure && \
  	make setup && \
  	npx serverless deploy --stage develop && \
  	npx serverless deploy --stage staging && \
	npx serverless deploy --stage production
