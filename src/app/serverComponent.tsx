import { getNonce } from './serverActions';

export default async function() {
  const nonce = await getNonce();

  return (
    <div className="outline outline-red-600 rounded-md p-2 my-2">
      <div>This is a server component</div>
      <div>nonce: {nonce}</div>
    </div>
  )
}

