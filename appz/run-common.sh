[[ $(basename $0) =~ run-compose--(.*).sh ]]
source ./common-env
export COMPOSE_SITE_NAME=${BASH_REMATCH[1]}

if [ -z "${COMPOSE_PROJECT_NAME}" ]; then
    export COMPOSE_PROJECT_NAME=jks_${COMPOSE_SITE_NAME}_
fi
echo "----------------"
echo "COMPOSE_PROJECT_NAME => ${COMPOSE_PROJECT_NAME}"
echo ""

docker-compose \
-f docker-compose.yaml \
-f docker-compose.${COMPOSE_SITE_NAME}.yaml \
$@