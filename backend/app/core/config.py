from google.cloud import firestore, storage

db = firestore.Client.from_service_account_json('credentials/service.json')
storage_client = storage.Client.from_service_account_json('credentials/service.json')
bucket = storage_client.bucket('teamit-fd85a.appspot.com')
