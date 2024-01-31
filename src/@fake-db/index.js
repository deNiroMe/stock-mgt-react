import mock from './mock'

import './products/products'
import './apps/userList'

mock.onAny().passThrough()
