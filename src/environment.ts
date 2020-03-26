import BackendClient from './client/BackendClient'
import {object} from "prop-types";

let client: BackendClient | null = null
function getClient(baseUrl: string) {
	if (client == null || client === undefined) {
		client = new BackendClient(baseUrl)
	}

	return client
}

interface Environment {
	baseUrl: string,
	client: BackendClient
}

let environment = {} as Environment

environment.baseUrl = "localhost:8080"
environment.client = getClient(environment.baseUrl)

export default environment